export default interface CartType{
    cartId: number;
    userId: number;
    user: any;
    cartArticles: {
        cartArticleId: number;
        articleId: number;
        quantity: number;
        article: {
            articleId: number;
            name: string;
            category: {
                categoryId: number;
                name: string;
            };
            articlePrices: {
                articlePriceId: number;
                price: number;
            }[];
        }
    }[];
}