import Link from "next/link";
import { PageIntro } from "@/components/ui";
export default function NotFound() { return <div><PageIntro eyebrow="Not found" title="That synthetic record is not available" description="The requested route or asset identifier does not match content in this prototype." /><Link className="button mt-8 inline-flex" href="/catalog">Return to catalog →</Link></div>; }
