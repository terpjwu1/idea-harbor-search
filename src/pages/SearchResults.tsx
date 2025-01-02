import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Type what kind of business idea you're looking for",
      });
      return;
    }
    setSearchParams({ q: searchQuery });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-4">
        {/* Global Search Bar */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            IdeaHarbor
          </button>
          <form onSubmit={handleSearch} className="relative w-96">
            <Input
              type="text"
              placeholder="Search business ideas..."
              className="w-full h-10 pl-4 pr-10 text-sm rounded-full border-2 border-primary/20 focus:border-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8 rounded-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Search Results */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">
            Search Results for "{initialQuery}"
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder results - you can replace these with actual search results */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">
                  Business Idea {index + 1}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-sm mb-3">
                  Category
                </span>
                <p className="text-muted-foreground mb-3">
                  Description of the business idea goes here...
                </p>
                <p className="font-semibold text-primary">$10K-40K/month</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;