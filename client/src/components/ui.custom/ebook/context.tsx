'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useEbookStore from '@/hooks/useEbookStore';
import { Trash2 } from 'lucide-react';

export default function Context({
  selection,
  onHighlight,
  onRemoveHighlight,
  isOpen,
  setIsOpen,
}: any) {
  const { highlights, color } = useEbookStore();

  if (!selection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold items-center justify-center">
            Highlight
          </DialogTitle>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent className="p-0 pt-4">
            <div className="flex flex-wrap gap-2">
              {color.map((item) => (
                <Button
                  key={item.name}
                  className="w-8 h-8 rounded-full p-0"
                  style={{ backgroundColor: item.code }}
                  onClick={() => {
                    onHighlight(item);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-0 pt-4">
            <p className="text-sm text-gray-600 mb-2">
              "{selection.content?.substring(0, 100)}..."
            </p>
            {highlights.find((item) => item.key === selection?.key) && (
              <Button
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={() => {
                  onRemoveHighlight(selection);
                  setIsOpen(false);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
