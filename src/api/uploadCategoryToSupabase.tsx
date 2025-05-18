import { supabase } from "./supabase";

export const uploadCategoryToSupabase = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("category")
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("category")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
