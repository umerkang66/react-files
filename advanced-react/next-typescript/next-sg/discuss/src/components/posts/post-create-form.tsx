'use client';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';

import * as actions from '@/actions';
import FormButton from '../common/form-button';

interface Props {
  slug: string;
}

function PostCreateForm({ slug }: Props) {
  const [formState, action] = useFormState(
    // we can also use bind method on actions.createPost, and pass the slug here
    actions.createPost,
    {
      // this is the initial value of formState
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Posts</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <input type="hidden" name="slug" value={slug} />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />

            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default PostCreateForm;
