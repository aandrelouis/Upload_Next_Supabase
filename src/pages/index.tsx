import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { supabase } from '@/lib/initSupabase';
import { v4 as uuidv4 } from 'uuid';

// export default function Home() {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadUrl, setUploadUrl] = useState('');

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     } else {
//       setFile(null);
//     }
//   };

//   const handleUpload = async (academyId: string) => {
//     if (!file) {
//       alert("Por favor, selecione um arquivo para fazer upload.");
//       return;
//     }

//     try {
//       const fileExt = file.name.split('.').pop();
//       const randomId = uuidv4();
//       const fileName = `${randomId}.${fileExt}`;

//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from('walls')
//         .upload(fileName, file);

//       if (uploadError) {
//         throw new Error('Erro ao fazer upload do arquivo: ' + uploadError.message);
//       }

//       const { data: urlData } = await supabase.storage
//         .from('walls')
//         .getPublicUrl(fileName);

//       if (!urlData) {
//         throw new Error('Erro ao obter URL pública do arquivo: ');
//         return;
//       }

//       const publicUrl = urlData?.publicUrl;
//       console.log('PublicUrl: ', publicUrl);
//       return publicUrl;

//     } catch (error) {
//       console.error('Erro durante o processo de upload:', error);
//     }
//   };

//   return (
//     <>
//       <main className={styles.main}>
//         <h1 className={styles.title}>Upload Button</h1>
//         <div className={styles.grid}>
//           <div className={styles.card}>
//             <h3>Upload</h3>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={() => handleUpload("IDTOCA")}>Upload File</button>
//             {uploadUrl && <p>File uploaded: <a href={uploadUrl} target="_blank">View File</a></p>}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async (academyId: string) => {
    if (!file) {
      alert("Por favor, selecione um arquivo para fazer upload.");
      return;
    }

    try {
      // Assumindo que o arquivo é JSON, podemos usar uma extensão .json fixa
      const fileName = `${uuidv4()}.json`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('walls')
        // Configurar 'file' como Blob com tipo 'application/json'
        .upload(fileName, file, {
          contentType: 'application/json',
          upsert: false,
        });

      if (uploadError) {
        throw new Error('Erro ao fazer upload do arquivo: ' + uploadError.message);
      }

      const { data: urlData } = await supabase.storage
        .from('walls')
        .getPublicUrl(fileName);

      if (!urlData) {
        throw new Error('Erro ao obter URL pública do arquivo.');
      }

      const publicUrl = urlData.publicUrl;
      console.log('PublicUrl: ', publicUrl);
      setUploadUrl(publicUrl); // Certifique-se de atualizar o estado com a URL do arquivo carregado
      return publicUrl;

    } catch (error) {
      console.error('Erro durante o processo de upload:', error);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Upload Button</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Upload</h3>
            <input type="file" onChange={handleFileChange} accept="application/json" />
            <button onClick={() => handleUpload("IDTOCA")}>Upload File</button>
            {uploadUrl && <p>File uploaded: <a href={uploadUrl} target="_blank" rel="noopener noreferrer">View File</a></p>}
          </div>
        </div>
      </main>
    </>
  );
}
