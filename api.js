// api.js - Gestion de l'upload vers Cloudflare R2
// Utilise les identifiants S3 configurés pour ton bucket R2

import { S3Client, PutObjectCommand } from "https://esm.sh/@aws-sdk/client-s3";

// Tes identifiants Cloudflare R2 (récupérés depuis ton tableau de bord)
const R2_CONFIG = {
    region: "auto",
    endpoint: "https://b9abcf5d94a779d2f953da462f801f6.r2.cloudflarestorage.com", // Ton point de terminaison S3
    credentials: {
        accessKeyId: "19db9b0f0dd92bf2c2d760b0ea6d217a",
        secretAccessKey: "4c2f6e070286b7814cb3d3d2c2e991d145337da9e69c99720501c1c5dbb8fa"
    },
    bucketName: "drlas-bucket" // Nom de ton bucket (à adapter si nécessaire)
};

const s3Client = new S3Client({
    region: R2_CONFIG.region,
    endpoint: R2_CONFIG.endpoint,
    credentials: R2_CONFIG.credentials,
});

/**
 * Fonction pour uploader un fichier vers Cloudflare R2
 * @param {File} file - Le fichier à uploader (APK, ZIP, image, etc.)
 * @returns {Promise<string>} - L'URL publique du fichier uploadé
 */
export async function uploadFileToR2(file) {
    try {
        const fileName = `uploads/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        
        const uploadParams = {
            Bucket: R2_CONFIG.bucketName,
            Key: fileName,
            Body: file,
            ContentType: file.type,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Retourne l'URL publique de ton fichier sur R2 (ou ton domaine personnalisé lié)
        return `https://pub-xxxx.r2.dev/${fileName}`; 
    } catch (error) {
        console.error("Erreur lors de l'upload vers R2 :", error);
        throw error;
    }
}
