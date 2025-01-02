import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

const generateBusinessIdeas = (searchTerm: string) => {
  // Base categories that we'll use to generate ideas
  const categories = ["Technology", "E-commerce", "Health & Wellness", "Education", "Sustainability", "Food & Beverage"];
  const baseRevenues = ["5K-20K", "10K-40K", "15K-60K", "20K-80K", "25K-100K"];
  
  // Generate ideas based on the search term
  const ideas = [
    {
      title: `${searchTerm} Consulting Platform`,
      category: "Technology",
      description: `Online platform providing expert ${searchTerm} consulting services to businesses and individuals`,
      revenue: `${baseRevenues[0]}/month`,
    },
    {
      title: `${searchTerm} Marketplace`,
      category: "E-commerce",
      description: `Digital marketplace connecting ${searchTerm} providers with customers`,
      revenue: `${baseRevenues[1]}/month`,
    },
    {
      title: `${searchTerm} Education Service`,
      category: "Education",
      description: `Online courses and training programs focused on ${searchTerm}`,
      revenue: `${baseRevenues[2]}/month`,
    },
    {
      title: `${searchTerm} Analytics Software`,
      category: "Technology",
      description: `SaaS platform providing analytics and insights for the ${searchTerm} industry`,
      revenue: `${baseRevenues[3]}/month`,
    },
    {
      title: `${searchTerm} Mobile App`,
      category: "Technology",
      description: `Mobile application helping users with their ${searchTerm} needs`,
      revenue: `${baseRevenues[4]}/month`,
    },
    {
      title: `${searchTerm} Subscription Box`,
      category: "E-commerce",
      description: `Monthly subscription box service delivering curated ${searchTerm} products`,
      revenue: `${baseRevenues[0]}/month`,
    },
  ];

  return ideas;
};

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

  const businessIdeas = generateBusinessIdeas(initialQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-4">
        {/* Header with Back Button and Search */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              IdeaHarbor
            </h1>
          </div>
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
          <h2 className="text-2xl font-semibold mb-6">
            Search Results for "{initialQuery}"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessIdeas.map((idea, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-sm mb-3">
                  {idea.category}
                </span>
                <p className="text-muted-foreground mb-3">{idea.description}</p>
                <p className="font-semibold text-primary">${idea.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;