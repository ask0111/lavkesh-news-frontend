import { BlogPost } from "@/common-component/redux-config/slices/blogPostSlice";

export const validate = (values: BlogPost ) => {
    const newErrors: { [key: string]: string } = {};

    // Custom validation logic
    if (!values.title) newErrors.title = "Title is required.";
    // if (!values.subTitle) newErrors.subTitle = "Sub title is required.";
    if (!values.image) newErrors.image = "Image URL is required.";
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(values.image))
      newErrors.image = "Must be a valid image URL.";
    if (!values.content) newErrors.content = "Content is required.";
    if (!values.categories) newErrors.categories = "Category is required.";
    if (!values.slug) newErrors.slug = "Slug is required.";
    // if (!values.url) newErrors.url = "url is required.";
    if (!values.meta.title) newErrors["meta.title"] = "Meta title is required.";
    if (!values.meta.description)
        newErrors["meta.description"] = "Meta description is required.";

    return newErrors;
  };

  export const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };