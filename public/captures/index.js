import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function printFilesAsArray(folderPath) {
    try {
        // قراءة محتويات المجلد
        const files = readdirSync(folderPath);
        
        // تصفية العناصر لاستبعاد المجلدات الفرعية (اختياري)
        const fileNames = files.filter(file => {
            const fullPath = join(folderPath, file);
            return statSync(fullPath).isFile();
        });
        
        // طباعة المصفوفة
        console.log('أسماء الملفات كمصفوفة:');
        console.log(JSON.stringify(fileNames, null, 2));
        
        return fileNames;
    } catch (error) {
        console.error('حدث خطأ:', error.message);
        return [];
    }
}

// استخدام الدالة
const folderPath = './kosa_designs'; // المسار الذي تريد عرض محتوياته
printFilesAsArray(folderPath);