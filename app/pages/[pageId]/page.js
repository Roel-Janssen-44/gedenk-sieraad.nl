import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import PageInfo from "@/components/PageInfo";

export default async function Page({ params }) {
  const pageResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_COLLECTION_QUERY,
      variables: {
        pageName: params.pageId,
      },
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });
  const pageJson = await pageResponse.json();

  if (pageJson.errors) {
    console.error("GraphQL Errors:", pageJson.errors);
  }

  return (
    <div className="container">
      <h1 className="font-roboto text-3xl mb-10">{pageJson.data.page.title}</h1>
      <div className="info-page">
        <PageInfo page={pageJson.data.page} />
      </div>
    </div>
  );
}

const GRAPHQL_COLLECTION_QUERY = `
query PageInfo($pageName: String!) {
    page(handle: $pageName) {
        title
        body
        seo {
          description
          title
        }
      }
}
`;
