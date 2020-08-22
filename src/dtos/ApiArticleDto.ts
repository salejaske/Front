export default interface ApiArticleDto {
    articleId: number;
    name: string;
    categoryId: number;
    excerpt: string;
    description: string;
    status: "dostupno" | "nije dostupno";
    articleFeatures: {
        articleFeatureId: number;
        featureId: number;
        value: string;
    }[];
    features: {
        featureId: number;
        name: string;
    }[];
    articlePrices: {
        articlePriceId: number;
        price: number;
    }[];
    photos: {
        photoId: number;
        imagePath: string;
    }[];
    
    category?: {
        name: string;
    };


}