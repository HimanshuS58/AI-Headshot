import type { CloudinaryImage } from "@cloudinary/url-gen/index";
import { cld } from "../cloudinary/config";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";


const WIDTH = 600;
const HEIGHT = 750;

export function buildOriginalPreview(publicId: string) : CloudinaryImage {

    // below cld() returns the image object for the original image uploaded to Cloudinary, which can be used with the AdvancedImage component 
    // from @cloudinary/react (see Home.tsx)
    return cld 
    .image(publicId)
    .resize(fill().width(WIDTH).height(HEIGHT).gravity(autoGravity()))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()))  
}