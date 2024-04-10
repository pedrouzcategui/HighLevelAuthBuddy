export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  try {
    const slug = params.slug;

    return Response.json({ slug });
  } catch (error) {
    return Response.error();
  }
}
