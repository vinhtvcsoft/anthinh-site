import React, {
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Box,
    Button,
    Grid2,
    Typography,
} from "@mui/material";
import { UploadFile, Close } from '@mui/icons-material'
import { FileUploader } from 'react-drag-drop-files';
import { IHouseItem } from 'types';
import { UseFormReturn } from 'react-hook-form';

interface IMediaProps {
    form: UseFormReturn<IHouseItem>;
}

const Media: React.FC<IMediaProps> = ({ form }) => {
    const typeRef = useRef<any>(null);
    const imageId = useRef<number>(1);
    const [images, setImages] = useState<{
        imageId: number;
        filename: string;
        filetype: string;
        filedata: any
    }[]>([]);

    const { setValue } = form;

    const handleImageUpload = (files: any) => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                const data = reader.result;
                setImages(old => [...old, {
                    imageId: imageId.current,
                    filename: file.name,
                    filetype: file.type,
                    filedata: data
                }]);
                imageId.current += 1;
            };
            reader.readAsDataURL(file);

        }
    };
    useEffect(() => {
        setValue('attachments', images);
    }, [images]);
    const fileTypes = ["JPG", "PNG", "GIF"];
    return (
        <Box>
            <Grid2 container spacing={1} mb={3}>
                {images.map((image, index) => (
                    <Grid2 size={4} key={index} sx={{ position: 'relative', }}>
                        <Box sx={{ position: 'absolute', cursor: 'pointer', right: 0, p: 1 }}>
                            <Close sx={{ color: '#C80001' }} onClick={() => {
                                const { imageId } = image;
                                const newImages = images.filter((img) => img.imageId !== imageId);
                                setImages(newImages);
                            }} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: '8px',
                            }}
                        >
                            <img
                                src={image.filedata}
                                alt={`uploaded-file-${index}`}
                                style={{ maxHeight: '100%', maxWidth: '100%', }}
                            />
                        </Box>

                    </Grid2>
                ))}

            </Grid2>

            <FileUploader
                inputRef={typeRef}
                multiple={true}
                sx={{ display: "none" }}
                name={'mediaFiles'}
                handleChange={(files: any) => {
                    handleImageUpload(files);
                }}
                types={fileTypes}
            >
                <Box sx={{
                    minHeight: '200px',
                    border: '1px dashed #2C2C2C',
                    borderRadius: '8px',
                    alignContent: 'center',
                }}>
                    <Box width={'fit-content'} mx='auto' justifyItems={'center'}>
                        <UploadFile sx={{ fontSize: '48px', color: 'rgb(0,0,0,0.8)' }} />
                        <Typography >Kéo thả ảnh vào đây hoặc</Typography>
                        <Button sx={{
                            border: '1px solid #2C2C2C',
                            borderRadius: '16px',
                            textTransform: 'none',
                            color: '#2C2C2C',
                            height: '50px',
                            width: '250px',
                            my: '12px'
                        }}>Chọn ảnh từ thiết bị (tối đa 5 ảnh)</Button>
                    </Box>
                </Box>
            </FileUploader>
        </Box>
    );
};

export default memo(Media);