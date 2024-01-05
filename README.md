This is a [Next.js](https://nextjs.org/) project setup using app router ( with react server components ).

## Running it locally

Please ensure that you have node version 18 or above installed.

To run the development server, please use below command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup

This setup has Next 14, with app router and styled-components.

For fetching users Next Apis are being used with json data which is available at endpoint: `/api/users`
which can be filtered using `query` search parameter.


At components level, SearchInput provides the input component to which `content` and `onChange` props are passed. `content` contains the html content of the input and the search query if present.

The search query is used to fetch the results which are listed by passing `options` prop to the SearchInput.


`useApi` hook is created to provide interface to fetch api data for each new query with debouncing.
