# Project Specification: KolayGider (Multi-Tenant Expense SaaS PWA)

## Objective
A lightweight, mobile-first SaaS web app for small businesses to track monthly payments, recurring bills, and expense categories, featuring a Super Admin Panel for client management and PWA support for mobile installation.

## Roles & Access Control
1. **Super Admin (Developer):** Manages registered businesses (add/edit/delete/deactivate) and monitors system usage.
2. **Business Owner (Tenant):** Manages strictly their own business expenses, categories, and account settings in isolation.

## Data Model (`db.json`)

```json
{
  "super_admin": {
    "id": "sa_1",
    "email": "admin@kolaygider.com",
    "role": "SUPER_ADMIN"
  },
  "businesses": [
    {
      "id": "biz_101",
      "ownerName": "Ahmet Yılmaz",
      "businessName": "Yılmaz Restoran",
      "email": "ahmet@yilmazrestoran.com",
      "phone": "05321112233",
      "status": "active",
      "createdAt": "2026-01-15"
    },
    {
      "id": "biz_102",
      "ownerName": "Ayşe Kaya",
      "businessName": "Kaya Terzi",
      "email": "ayse@kayaterzi.com",
      "phone": "05334445566",
      "status": "active",
      "createdAt": "2026-03-10"
    }
  ],
  "expenses": [
    {
      "id": "exp_1",
      "businessId": "biz_101",
      "title": "Dükkan Kirası",
      "amount": 25000,
      "date": "2026-07-01",
      "category": "Kira",
      "paymentMethod": "Havale/EFT",
      "isRecurring": true,
      "status": "paid"
    },
    {
      "id": "exp_2",
      "businessId": "biz_102",
      "title": "Kumaş Alımı",
      "amount": 8500,
      "date": "2026-07-10",
      "category": "Malzeme",
      "paymentMethod": "Kredi Kartı",
      "isRecurring": false,
      "status": "pending"
    }
  ],
  "categories": [
    { "id": "cat_1", "businessId": "biz_101", "name": "Kira & Aidat", "color": "#EF4444", "icon": "Home" },
    { "id": "cat_2", "businessId": "biz_101", "name": "Faturalar", "color": "#3B82F6", "icon": "Zap" },
    { "id": "cat_3", "businessId": "biz_102", "name": "Malzeme", "color": "#10B981", "icon": "ShoppingBag" }
  ]
}