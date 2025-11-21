module Jekyll
  class ArtTaxonomyGenerator < Generator
    safe true
    priority :highest

    def generate(site)
      return unless site.collections['arts']
      
      # Collect unique categories and tags
      categories = Set.new
      tags = Set.new
      
      site.collections['arts'].docs.each do |doc|
        categories.add(doc.data['category']) if doc.data['category']
        tags.merge(doc.data['tags']) if doc.data['tags']
      end
      
      # Generate category pages
      categories.each do |cat|
        site.pages << CategoryPage.new(site, cat)
      end
      
      # Generate tag pages  
      tags.each do |tag|
        site.pages << TagPage.new(site, tag)
      end
      
      # Note: Jekyll may show "Conflict" warnings for these generated pages,
      # but this is a false positive - only one file is actually written per page
    end
  end

  class CategoryPage < Page
    def initialize(site, category)
      @site = site
      @base = site.source
      @dir  = File.join('arts', 'categories', Jekyll::Utils.slugify(category))
      @name = 'index.html'

      self.process(@name)
      
      # Initialize data instead of reading from layout file
      self.data = {
        'layout' => 'art_category',
        'category' => category,
        'title' => "Arts in #{category.capitalize}"
      }
    end
  end

  class TagPage < Page
    def initialize(site, tag)
      @site = site
      @base = site.source
      @dir  = File.join('arts', 'tags', Jekyll::Utils.slugify(tag))
      @name = 'index.html'

      self.process(@name)
      
      # Initialize data instead of reading from layout file
      self.data = {
        'layout' => 'art_tag',
        'tag' => tag,
        'title' => "Arts tagged with #{tag}"
      }
    end
  end
end
