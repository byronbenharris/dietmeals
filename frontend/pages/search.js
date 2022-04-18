import Link from 'next/link'
import { useRouter } from "next/router";


export default function Search() {
  const { query } = useRouter();
  return (
    <>
        <div>
          <h1>Search</h1>
          <p>{query.find}</p>
          <p>{query.ignore}</p>
        </div>
        <h2>
            <Link href="/">
              <a>Search Again</a>
            </Link>
        </h2>
    </>
  );
}