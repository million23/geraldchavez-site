import { GraphQLClient } from "graphql-request";

const url = process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API as string;

const $$hygraph = new GraphQLClient(url);

export default $$hygraph;
