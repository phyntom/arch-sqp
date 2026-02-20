import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '@/components/ui/popover'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const positionStyles: Record<string, string> = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2'
}

function InsetButton({ position }: { position: keyof typeof positionStyles }) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild className={`absolute ${positionStyles[position]}`}>
          <Button variant="outline" size="icon-sm">
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 rounded-none" align="start">
          <PopoverHeader>
            <PopoverTitle>ADD INSET</PopoverTitle>
          </PopoverHeader>
          <FieldGroup className="gap-2 mt-2">
            <Field orientation="vertical">
              <FieldLabel htmlFor="width" className="w-1/2 text-[10px]">
                Width
              </FieldLabel>
              <Select>
                <SelectTrigger className="w-full text-[10px]">
                  <SelectValue placeholder="Select width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25px">25px</SelectItem>
                  <SelectItem value="50px">50px</SelectItem>
                  <SelectItem value="100px">100px</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field orientation="vertical">
              <FieldLabel htmlFor="height" className="w-1/2 text-[10px]">
                Height
              </FieldLabel>
              <Input id="height" className="text-sm" defaultValue="25px" />
            </Field>
            <Field orientation="horizontal">
              <Button className="bg-primary w-1/2 text-[10px]">Add</Button>
              <Button className="bg-accent w-1/2  text-[10px]" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </PopoverContent>
      </Popover>
    </>
  )
}

export function InsetWindow() {
  return (
    <div className="flex flex-col gap-2 border-b">
      <div className="border-b py-2 px-4">
        <h3 className="font-semibold">Inset Window</h3>
      </div>
      <div className="relative h-48 bg-muted rounded-md m-2">
        <InsetButton position="top-left" /> {/* pass the key, not the resolved string */}
        <InsetButton position="top-right" />
        <InsetButton position="bottom-left" />
        <InsetButton position="bottom-right" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground text-center w-full">
          <span>Inset Window</span>
        </div>
        {/* <Button className="absolute bottom-2 left-2" variant="outline" size="icon-sm">
          <Plus />
        </Button>
        <Button className="absolute bottom-2 right-2" variant="outline" size="icon-sm">
          <Plus />
        </Button> */}
      </div>
    </div>
  )
}
