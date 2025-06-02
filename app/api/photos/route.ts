import {supabase} from "@/lib/supabase";

export async function GET() {
  const {data, error} = await supabase.storage
    .from("photos")
    .list("", {limit: 100});

  console.log(await supabase.storage.listBuckets());

  if (error) {
    return Response.json({error: error.message}, {status: 500});
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return Response.json({error: "missing api route"}, {status: 500});
  }

  console.log(data)

  const urls = data
    .filter(file => file.name.endsWith(".png") || file.name.endsWith(".jpg"))
    .map(file => {
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${file.name}`;
    });

  return Response.json(urls);
}
