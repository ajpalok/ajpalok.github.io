module Jekyll
  class ArtsPaginationGenerator < Generator
    safe true
    priority :low

    def generate(site)
      return unless site.collections['arts']

      items_per_page = 12
      arts_docs = site.collections['arts'].docs.sort_by(&:date).reverse

      # Paginate main arts listing (use arts/index.html as source so content is rendered)
      main_source = File.join(site.source, 'arts', 'index.html')
      paginate(site, arts_docs, '/arts/', items_per_page, main_source)
    end

    private

    def paginate(site, docs, base_url, items_per_page, source_path = nil, extra_data = {})
      return if docs.size <= items_per_page

      total_pages = (docs.size.to_f / items_per_page).ceil

      # If a page already exists at the base_url (page 1), inject its pagination data
      # This handles the canonical index (e.g. /arts/)
      first_page_docs = docs.slice(0, items_per_page) || []
      source_page = site.pages.find { |p| p.url == base_url }
      if source_page
        source_page.data['current_page'] = 1
        # Provide Liquid-friendly simple hashes for the first page as well
        source_page.data['paginated_arts'] = first_page_docs.map do |d|
          {
            'title' => (d.data['title'] || d.data['name'] || File.basename(d.relative_path, File.extname(d.relative_path))).to_s,
            'url' => (d.url || ''),
            'image' => (d.data['image'] || ''),
            'date' => (d.data['date'] || ''),
            'content' => (d.content || '')
          }
        end
        extra_data.each { |k, v| source_page.data[k] = v }
      end

      (2..total_pages).each do |page_num|
        start_index = (page_num - 1) * items_per_page
        page_docs = docs.slice(start_index, items_per_page) || []
        site.pages << ArtsPaginationPage.new(site, page_num, base_url, source_path, extra_data, page_docs)
      end
    end
  end

  class ArtsPaginationPage < Page
    def initialize(site, page_num, base_url, source_path = nil, extra_data = {}, page_docs = [])
      @site = site
      @base = site.source

      # normalize base_url and build directory like 'arts/page2'
      clean_base = base_url.sub(/^\//, '').sub(/\/$/, '')
      @dir = File.join(clean_base, "page#{page_num}")
      @name = 'index.html'

      self.process(@name)

      # If a source page exists (like arts/index.html), read its YAML and content
      if source_path && File.exist?(source_path)
        self.read_yaml(File.dirname(source_path), File.basename(source_path))
      else
        self.data = {}
      end

      # Ensure generated pages have their own permalink to avoid conflicts
      # e.g. /arts/page2/
      self.data['permalink'] = File.join(base_url, "page#{page_num}/")

      # Set pagination data and merge any extra data (layout, tag/category)
      self.data['current_page'] = page_num
      extra_data.each { |k, v| self.data[k] = v }

      # Provide the pre-sliced list of docs for this page so templates can iterate directly
      # Convert each Document to a simple hash of expected fields so templates iterate reliably
      self.data['paginated_arts'] = page_docs.map do |d|
        {
          'title' => (d.data['title'] || d.data['name'] || File.basename(d.relative_path, File.extname(d.relative_path))).to_s,
          'url' => (d.url || ''),
          'image' => (d.data['image'] || ''),
          'date' => (d.data['date'] || '')
        }
      end
    end
  end
end
