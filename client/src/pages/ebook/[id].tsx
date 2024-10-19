import '@/app/globals.css';
import SessionWrapper from '@/components/SessionWrapper';
import EbookViewer from '@/components/ui.custom/ebook';
import axios from '@/lib/axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ThemeProvider } from 'next-themes';

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all book IDs or a subset of book IDs
  const res = await axios.get('/books');
  const books = await res.data.books;

  // Generate the paths
  const paths = books.map((book: any) => ({
    params: { id: book._id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // or false if you want 404 for non-existent paths
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await axios.get(`/books/${id}`);
  const book = await res.data;

  return {
    props: { book },
    revalidate: 60, // Optional: revalidate every 60 seconds
  };
};
export default function Ebook({ book }: { book: any }) {
  if (!book) return null;
  else
    return (
      <>
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <EbookViewer book={book} />
          </ThemeProvider>
        </SessionWrapper>
      </>
    );
}
