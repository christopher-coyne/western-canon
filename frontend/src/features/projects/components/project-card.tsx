import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Tag {
  id: string;
  name: string;
}

interface CardProps {
  id: string;
  title: string;
  tags: Tag[];
  author: string;
  publishedDate: string;
  favorites: number;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  tags,
  author,
  publishedDate,
  favorites,
}) => {
  return (
    <Link to={`/projects/${id}`}>
      <div className="p-6 max-w-sm text-black bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3">{title}</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div>
            <p>By {author}</p>
            <p>{new Date(publishedDate).toLocaleDateString()}</p>
          </div>

          <div className="flex items-center gap-1">
            <Heart size={16} />
            <span>{favorites}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
