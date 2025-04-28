import { supabase } from "./supabase";

export const uploadArtworkToSupabase = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("artworks")
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("artworks")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
