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
      {/* <h1 className="font-roboto text-3xl mb-10">Privacy verklaring</h1> */}
      <div className="info-page">
        <PageInfo page={pageJson.data.shop.termsOfService} />
      </div>
    </div>
  );
}

const GRAPHQL_COLLECTION_QUERY = `
{
  shop {
    termsOfService {
      handle
      id
      title
      url
      body
    }
  }
}
`;
