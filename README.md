# oneRail e-commerce

This is the recruitment process task. The live version is available here:
[Github pages](https://bartekszajna.github.io/oneRail)


## Run the project

Make sure you have the Node version +22.12.0.

Run the commands below:

```bash
yarn
yarn dev
```

Two important notes:

1. Due to the API restrictions I had to store the JWT tokens in sessionStorage. It is generally perceived as a bad practice due to possible XSS attacks. In typical flow the access_token would be stored in-memory, and refresh_token should be kept in httpOnly, Secure cookie with Path and Domain restricting it only to the `/refresh-token` endpoint
2. The API has a significant architectural issue with refresh token lifecycle time shorter (10 hours) than the access token (20 days). Because of that I decided not to implement the refresh token flow, since basically there is no option that refresh token would still be valid at the time when access token expired.

If you have any questions I would love to discuss all the technical decisions and trade-offs I've made during the development process. The app however is not finished and still requires some refactors as well as inputs debouncing or unit&integration test coverage.