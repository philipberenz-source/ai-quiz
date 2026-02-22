import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

function CategorySelection({ categories, onSelectCategory, difficulty }) {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle>Choose a Category</CardTitle>
        <CardDescription>Both players answer the selected category in multiplayer.</CardDescription>
        {difficulty?.name && <Badge variant="secondary">Difficulty: {difficulty.name}</Badge>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="secondary"
              className="justify-start text-left text-sm"
              onClick={() => onSelectCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CategorySelection;
