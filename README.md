# Fugella — luxury storefront prototype

A responsive HTML/CSS/JavaScript portfolio project for browsing a fictional
pre-loved luxury collection. The implementation lives in [`Fugella/`](Fugella/).

## Try it

```sh
python3 -m http.server 8000 --directory Fugella
```

Open http://localhost:8000. No install or API credentials are required.

## Implemented

- Editorial storefront, responsive product grid and scroll navigation.
- Product search across visible brand and product names.
- Wishlist with local persistence, removal and keyboard-accessible dialog.
- Newsletter input validation with an explicit demo-only message.

## Prototype boundaries

Products are sample content. Account creation, seller onboarding, checkout and
product detail pages are not implemented. No payment, authentication, item
verification or email subscription takes place. The interface identifies this as a
portfolio demo. Images are externally hosted and require an internet connection.

## Verification

Run `node --check Fugella/script.js`. Manually check searching, wishlist persistence,
removal, Escape-to-close, and keyboard focus at desktop and mobile widths. No
unverified performance or accessibility scores are claimed.

## Author

[Xichavelo Rikhotso / DevWithX](https://github.com/DevWithX)
