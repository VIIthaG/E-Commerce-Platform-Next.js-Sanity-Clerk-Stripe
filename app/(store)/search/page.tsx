import React from "react";

async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = await searchParams;
  return <div>SearchPage</div>;
}

export default SearchPage;
