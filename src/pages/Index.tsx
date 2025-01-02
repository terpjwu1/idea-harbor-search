import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    toast({
      title: "Searching...",
      description: `Looking for business ideas related to: ${searchQuery}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Find Your Next Business Idea
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Search through thousands of validated business ideas and start your entrepreneurial journey today
          </p>
          
          <form onSubmit={handleSearch} className="relative mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Search business ideas..."
                className="w-full h-14 pl-6 pr-12 text-lg rounded-full border-2 border-primary/20 focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                size="icon"
                className="absolute right-2 h-10 w-10 rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span>Popular searches:</span>
            {["Tech Startups", "E-commerce", "SaaS", "Local Business", "Digital Products"].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="hover:text-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Validated Ideas",
              description: "All business ideas are validated by successful entrepreneurs",
              icon: "✓",
            },
            {
              title: "Detailed Analysis",
              description: "Get market size, competition, and startup costs",
              icon: "📊",
            },
            {
              title: "Action Plan",
              description: "Step-by-step guide to start your business",
              icon: "🎯",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;