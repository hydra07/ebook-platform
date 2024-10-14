import { getBooks } from "../services/book";




interface IBook{
    title: string;
    description: string;
    cover: string;
    views: number;
    status: string;
    createdAt: Date;
    lastUpdateAt: Date;
    bookUrl: string;
    author: IAuthor;
    category: ICategory;
  }

  interface IAuthor {
    name: string;
    description: string;
  }
  
  interface ICategory {
    name: string;
  }



export default async function Shop({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    const books = await getBooks();
    console.log(books);
    return (
        <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <Banner />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/5">
          <Suspense fallback={<FiltersSkeleton />}>
            <SearchBar />
            <CategoryFilter />
            <PriceFilter />
          </Suspense>
        </div>
        <div className="w-full md:w-3/4">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
      <Cart/>
    </div>
    );
}
