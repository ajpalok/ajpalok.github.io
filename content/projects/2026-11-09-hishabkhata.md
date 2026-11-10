---
slug: hishabkhata
date: 2026-11-09
name: HishabKhata
subHeading: "Order intelligence for small e-commerce shop owners — one dashboard for storefront orders, multi-courier delivery status, and subscriptions."
description: "HishabKhata (\"account book\" in Bangla) connects a shop's storefront and courier accounts into one dashboard, so small shop owners see order and delivery status at a glance instead of checking four services by hand. Built with Next.js, Ruby on Rails, PostgreSQL and Redis, with Steadfast, Pathao, RedX, Sundarban and WooCommerce integrations."
type: Web Application
code_link: 
web_url: https://hishabkhata.2haas.com/
image: /assets/images/uploads/projects/hishabkhata-cover.png
featured: true
---

## Overview

**HishabKhata** ("account book" in Bangla) is order intelligence for small and solo e-commerce shop owners. It connects to a shop's storefront (WooCommerce, Shopify or custom) and to Bangladeshi courier services to centralize orders, delivery status and product data in one place, with subscription-based access tiers and an admin layer for platform operators.

A **2HAAS** product. Live: [https://hishabkhata.2haas.com](https://hishabkhata.2haas.com/)

---

## The Problem

Small shop owners in Bangladesh run their storefront, two to four courier accounts, and a payment gateway as separate logins with no shared view. Answering "did order #1234 get delivered?" or "which orders are stuck with the courier?" means checking each service by hand, often from a phone, between other tasks. Success for a shop owner is opening one app and immediately knowing what needs attention — without hunting through menus or waiting on slow pages.

---

## Features

### For Shop Owners
1. **Storefront sync:** connects to WooCommerce shops to automatically import orders, products and customers.
2. **Multi-courier tracking:** centralizes delivery status across **Steadfast, Pathao, RedX and Sundarban** in one view instead of four separate logins.
3. **Order intelligence:** order and delivery status surfaced at a glance, built to be legible on a budget phone.
4. **Inventory tracking:** stock levels and stock movements per product/variant, across inventory locations.
5. **Multi-shop support:** connect and switch between several shops from one account.
6. **Subscriptions:** tiered plans with **bKash** and **Nagad** payment integration and a subscription activation flow.
7. **API keys:** scoped keys for programmatic access.
8. **Reports:** cached order, sales and delivery performance reporting.

### For Admin Staff and Superadmins
1. **Shop-owner management:** a denser back-office view, separate from the shop-owner-facing app but sharing the same visual language.
2. **Subscription and plan management:** manage shop-owner subscriptions, payment history and (in progress) custom per-shop plans.
3. **Permission-gated access:** admin capabilities are scoped by permission rather than all-or-nothing; superadmins get full access by default.

---

## Tech Stack

- **Frontend**:
    - Next.js 16 (static export), React 19, TypeScript
    - Tailwind CSS 4
    - TanStack Query, Zustand, React Hook Form + Zod
    - Recharts
- **Backend**:
    - Ruby on Rails 8.1 (Ruby 4.0) JSON API
    - Devise + devise-jwt (auth), Pundit (authorization)
    - Sidekiq + sidekiq-cron on Redis (courier polling, order import, payment reminders)
- **Data and Infrastructure**:
    - PostgreSQL, Redis
- **Integrations**:
    - Couriers: Steadfast, Pathao, RedX, Sundarban
    - Storefront: WooCommerce
    - Payments: bKash, Nagad
- **Hosting**:
    - Cloudflare Pages (frontend)
    - Docker on EasyPanel (backend API and worker)

---

## Architecture

A classic decoupled client-server design. The frontend compiles to a static export served from Cloudflare Pages with no server of its own, and talks to the Rails API over JWT-authenticated requests. The backend runs courier status polling, WooCommerce order imports and payment reminders as background jobs through Sidekiq on Redis, independent of the request/response cycle.

---

## Design

The interface follows a design system called **"The Ledger"**: a dense, dependable working document a shop owner opens many times a day, not a dashboard to admire. A single Bengali maroon (`#9e1d44`) carries every action and status signal against a warm parchment-paper background and graphite text; maroon covers roughly ≤10% of any screen outside the login/reset-password gate, where it's allowed to dominate the whole surface. The system deliberately rejects the generic gradient-hero, oversized-stat-tile, glassmorphism "AI SaaS dashboard" look, leaning instead toward Linear-style density and restraint. Every screen is designed mobile-first and verified at phone width before shipping, and meets the WCAG AA baseline.

---

## My Role

Founder and lead developer. Architected and built both the Rails API and the Next.js frontend, the courier/WooCommerce/payment integrations, and the design system, with a teammate contributing on frontend and deployment fixes.

---

## Status

Live in production for pilot shop owners. Active work: an optimized, filterable shop-owner list with CSV import/export for admins, and a granular permission and custom-plan system for subscription management.
