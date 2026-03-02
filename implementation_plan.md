# Goal Description
The objective is to replace the `ProductDetailModal` with a dedicated `ProductDetails` page. When a user clicks on a product card in Home, Categories, or Cart, it should navigate them to this new page, functioning as a full-screen view. Additionally, verify if the Cloudflare deployment issue (white screen) is fully resolved by the previous Vite config change, as the user mentioned the issue persists.

## User Review Required
None

## Proposed Changes
### Routing & Core
#### [MODIFY] [src/App.jsx](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/src/App.jsx)
- Add a new route handler for `product/:id` in the simple hash router.
- Pass down the product ID to the new `ProductDetails` page component.

### Pages
#### [NEW] [src/pages/ProductDetails.jsx](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/src/pages/ProductDetails.jsx)
- Create a new page component that takes the product ID from the route.
- Fetch the specific product from the `categories` data context, or accept data via state.
  - *Approach:* We will pass product data via route state, or look it up from `window.history.state` or a context. Since standard React Router isn't used (it's a manual hash router), the easiest robust approach is for the new route to be `#product_details/:id`, and the component extracts the ID from the hash and looks up the product in `useAppData()`.
- Implement a full-page design showing image, price, title, descriptions, and a sticky "Add to Cart" block at the bottom.
- Implement a "Back" button to return to the previous screen.

#### [MODIFY] [src/pages/Home.jsx](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/src/pages/Home.jsx)
- Remove `ProductDetailModal` import and usage.
- Update the product card `onClick` handler to navigate to `#product_details/${p.id}` instead of opening the modal.

#### [MODIFY] [src/pages/Categories.jsx](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/src/pages/Categories.jsx)
- Remove `ProductDetailModal` import and usage.
- Update the product card `onClick` handler to navigate to `#product_details/${p.id}`.

#### [MODIFY] [src/pages/Cart.jsx](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/src/pages/Cart.jsx)
- Remove `ProductDetailModal` import and usage.
- Update the product card `onClick` handler to navigate to `#product_details/${item.id}`.

### Components
#### [DELETE] [src/components/ProductDetailModal.jsx](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/src/components/ProductDetailModal.jsx)
- Remove this component as it is no longer needed.

## Verification Plan
### Manual Verification
1. Run `npm run dev` and navigate to Home.
2. Click on a product card and verify it opens a full page view.
3. Verify the back button functions properly.
4. Add to cart from the detail page and verify cart updates.
5. Repeat for Categories and Cart pages.
6. Trigger a `npm run build` and preview to ensure no build errors, helping verify the prior Cloudflare fix.
