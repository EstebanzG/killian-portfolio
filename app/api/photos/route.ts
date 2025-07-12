import {supabase} from "@/lib/supabase";
import {Photo} from "@/types/photos";

export async function GET() {
  const {data, error} = await supabase.storage
    .from("photos")
    .list("", {limit: 100});

  if (error) {
    return Response.json({error: error.message}, {status: 500});
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return Response.json({error: "missing api route"}, {status: 500});
  }

  const photos: Photo[] = data
    .filter(file => file.name.toLocaleLowerCase().endsWith(".png") || file.name.toLocaleLowerCase().endsWith(".jpg"))
    .map(file => {
      const fullUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${file.name}`;
      return {
        thumbnail: fullUrl + '?width=400&quality=75',
        fullSize: fullUrl,
        name: file.name
      };
    });

  return Response.json(photos);
}
