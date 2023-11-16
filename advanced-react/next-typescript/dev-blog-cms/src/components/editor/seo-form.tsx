import { useState, type FC, type ChangeEventHandler, useEffect } from 'react';
import classNames from 'classnames';
import slugify from 'slugify';

const commonInput =
  'w-full rounded border-2 border-secondary-dark bg-transparent p-2 text-primary-dark outline-none transition focus:border-primary-dark dark:text-primary dark:focus:border-primary';

export type SeoResult = { slug: string; tags: string; meta: string };

type Props = {
  title?: string;
  onChange?: (seo: SeoResult) => void;
  initialValue?: SeoResult;
};

const emptySeo = {
  slug: '',
  tags: '',
  meta: '',
};

const SeoForm: FC<Props> = ({ title, initialValue, onChange }) => {
  const [seoFormState, setSeoFormState] = useState<SeoResult>(() =>
    initialValue
      ? {
          ...initialValue,
          slug: slugify(initialValue.slug, { strict: true }),
        }
      : emptySeo,
  );

  // this will handle the onChange state for outer components
  useEffect(() => {
    setSeoFormState(prev => ({
      ...prev,
      slug: slugify(title?.toLowerCase() ?? '', { strict: true }),
    }));
  }, [title, onChange]);

  useEffect(() => {
    if (initialValue)
      setSeoFormState({
        ...initialValue,
        slug: slugify(initialValue.slug, { strict: true }),
      });
  }, [initialValue]);

  useEffect(() => {
    const state = {
      meta: seoFormState.meta,
      slug: seoFormState.slug,
      tags: seoFormState.tags,
    };

    onChange && onChange(state);
  }, [onChange, seoFormState.meta, seoFormState.slug, seoFormState.tags]);

  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target: { name, value } }) => {
    setSeoFormState(prev => {
      if (name === 'meta' && prev.meta.length === 150)
        return { ...prev, meta: value.substring(0, 150) };

      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-primary-dark dark:text-primary">
        SEO Section
      </h1>

      <Input
        label="Slug:"
        name="slug"
        placeholder="slug-goes-here"
        className="pl-12 italic"
        value={seoFormState.slug}
        onChange={onChangeHandler}
      />

      <Input
        label="Tags:"
        name="tags"
        placeholder="React, Next JS"
        className="pl-12"
        value={seoFormState.tags}
        onChange={onChangeHandler}
      />

      <div className="relative">
        <textarea
          name="meta"
          className={classNames(commonInput, 'h-20 resize-none text-lg')}
          placeholder="Meta Description: 150 characters will be fine."
          value={seoFormState.meta}
          onChange={onChangeHandler}
        />
        <p className="absolute bottom-3 right-3 text-sm text-primary-dark dark:text-primary">
          {seoFormState.meta.length}/150
        </p>
      </div>
    </div>
  );
};

const Input: FC<{
  name: string;
  value?: string;
  placeholder: string;
  className?: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ className, name, value, placeholder, label, onChange }) => {
  return (
    <label className="relative block">
      <span className="absolute top-1/2 -translate-y-1/2 pl-2 text-sm font-semibold text-primary-dark dark:text-primary">
        {label}
      </span>

      <input
        type="text"
        placeholder={placeholder}
        className={classNames(commonInput, className)}
        value={value}
        name={name}
        onChange={onChange}
      />
    </label>
  );
};

export { SeoForm };
