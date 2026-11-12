import NotFound from "@/app/not-found"

export default async function Member({ params }: { params: Promise<{ member: string }>}) {
  const { member } = await params;
  const memberList = ["mocoparfe", "hanseorin", "dangkey", "uuhee", "aerusolstice"];

  const isMember = memberList.includes(member);

  if (!isMember) {
    <NotFound />
  }

  return (
    <div></div>
  )
}