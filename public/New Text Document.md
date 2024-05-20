# Use these credentials to access the project via API: new-scooter-shop

# project_key: new-scooter-shop

# client_id: WIaiM4ht9dCe8eU7UoXNUQGd

# secret: 8-pF2dwaib8HgzFHKvOnO3xKNZuU47fc

# scope: manage_cart_discounts:new-scooter-shop manage_types:new-scooter-shop manage_project_settings:new-scooter-shop manage_order_edits:new-scooter-shop manage_customer_groups:new-scooter-shop manage_categories:new-scooter-shop manage_products:new-scooter-shop manage_customers:new-scooter-shop manage_orders:new-scooter-shop manage_payments:new-scooter-shop manage_shipping_methods:new-scooter-shop manage_my_payments:new-scooter-shop manage_tax_categories:new-scooter-shop manage_shopping_lists:new-scooter-shop manage_my_profile:new-scooter-shop manage_extensions:new-scooter-shop manage_discount_codes:new-scooter-shop create_anonymous_token:new-scooter-shop manage_my_orders:new-scooter-shop manage_my_shopping_lists:new-scooter-shop

# API URL: https://api.europe-west1.gcp.commercetools.com

# Auth URL: https://auth.europe-west1.gcp.commercetools.com

# cURL

curl https://auth.europe-west1.gcp.commercetools.com/oauth/token \
 --basic --user "WIaiM4ht9dCe8eU7UoXNUQGd:8-pF2dwaib8HgzFHKvOnO3xKNZuU47fc" \
 -X POST \
 -d "grant_type=client_credentials&scope=manage_cart_discounts:new-scooter-shop manage_types:new-scooter-shop manage_project_settings:new-scooter-shop manage_order_edits:new-scooter-shop manage_customer_groups:new-scooter-shop manage_categories:new-scooter-shop manage_products:new-scooter-shop manage_customers:new-scooter-shop manage_orders:new-scooter-shop manage_payments:new-scooter-shop manage_shipping_methods:new-scooter-shop manage_my_payments:new-scooter-shop manage_tax_categories:new-scooter-shop manage_shopping_lists:new-scooter-shop manage_my_profile:new-scooter-shop manage_extensions:new-scooter-shop manage_discount_codes:new-scooter-shop create_anonymous_token:new-scooter-shop manage_my_orders:new-scooter-shop manage_my_shopping_lists:new-scooter-shop"

# JS ES6

import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

const projectKey = 'new-scooter-shop'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
host: 'https://auth.europe-west1.gcp.commercetools.com',
projectKey,
credentials: {
clientId: 'WIaiM4ht9dCe8eU7UoXNUQGd',
clientSecret: '8-pF2dwaib8HgzFHKvOnO3xKNZuU47fc',
},
scopes: ['manage_cart_discounts:new-scooter-shop manage_types:new-scooter-shop manage_project_settings:new-scooter-shop manage_order_edits:new-scooter-shop manage_customer_groups:new-scooter-shop manage_categories:new-scooter-shop manage_products:new-scooter-shop manage_customers:new-scooter-shop manage_orders:new-scooter-shop manage_payments:new-scooter-shop manage_shipping_methods:new-scooter-shop manage_my_payments:new-scooter-shop manage_tax_categories:new-scooter-shop manage_shopping_lists:new-scooter-shop manage_my_profile:new-scooter-shop manage_extensions:new-scooter-shop manage_discount_codes:new-scooter-shop create_anonymous_token:new-scooter-shop manage_my_orders:new-scooter-shop manage_my_shopping_lists:new-scooter-shop'],
})
const httpMiddleware = createHttpMiddleware({
host: 'https://api.europe-west1.gcp.commercetools.com',
})
const client = createClient({
middlewares: [authMiddleware, httpMiddleware],
})

# SDK

import fetch from 'node-fetch';
import {
ClientBuilder,
type AuthMiddlewareOptions,
type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
host: 'https://auth.europe-west1.gcp.commercetools.com',
projectKey: 'new-scooter-shop',
credentials: {
clientId: "WIaiM4ht9dCe8eU7UoXNUQGd",
clientSecret: "8-pF2dwaib8HgzFHKvOnO3xKNZuU47fc",
},
scopes: ['manage_cart_discounts:new-scooter-shop manage_types:new-scooter-shop manage_project_settings:new-scooter-shop manage_order_edits:new-scooter-shop manage_customer_groups:new-scooter-shop manage_categories:new-scooter-shop manage_products:new-scooter-shop manage_customers:new-scooter-shop manage_orders:new-scooter-shop manage_payments:new-scooter-shop manage_shipping_methods:new-scooter-shop manage_my_payments:new-scooter-shop manage_tax_categories:new-scooter-shop manage_shopping_lists:new-scooter-shop manage_my_profile:new-scooter-shop manage_extensions:new-scooter-shop manage_discount_codes:new-scooter-shop create_anonymous_token:new-scooter-shop manage_my_orders:new-scooter-shop manage_my_shopping_lists:new-scooter-shop'],
fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
host: 'https://api.europe-west1.gcp.commercetools.com',
fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
.withClientCredentialsFlow(authMiddlewareOptions)
.withHttpMiddleware(httpMiddlewareOptions)
.withLoggerMiddleware()
.build();
