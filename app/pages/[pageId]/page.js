import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import PageInfo from "@/components/PageInfo";

// export const metadata = {
//   title:
//     "Gedenksieraden en herinneringssieraden voor jou persoonlijk gemaakt. gedenk-sieraad.nl",
//   description:
//     "Exclusieve gedenksieraden om as, haarlokjes en vingerafdrukken van je dierbare in te verwerken en te personaliseren. De online juwelier van voordelige ashangers, memorials, unieke assieraden en See You gedenksieraden. Herinneringssieraden voor huisdieren. Herdenkingswinkel",
// };

export default async function Page({ params }) {
  console.log(params.pageId);
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
      <PageInfo page={pageJson.data.page} />
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
