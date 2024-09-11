  import React, { useEffect, useState } from 'react';
  import Modal from '@mui/material/Modal';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import { db } from '../../firebase-config';
  import { doc, getDoc } from 'firebase/firestore';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, // Adjust the width as needed
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex', // Use Flexbox for layout
    alignItems: 'center', // Vertically center content
  };

  const imageStyle = {
    width: '50%', // Adjust the width of the image container
    height: 'auto',
  };

  const descriptionBoxStyle = {
    flex: 1, // Allow the description box to take remaining space
    border: '1px solid #ccc',
    padding: '1rem',
    marginTop: '1rem',
    minHeight: '200px', // Increase the minimum height of the description box
  };

  const ProductInfo = ({ productId, onClose }) => {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
      const getProductDetails = async () => {
        try {
          const productRef = doc(db, 'products', productId);
          const productSnapshot = await getDoc(productRef);

          if (productSnapshot.exists()) {
            setProductData(productSnapshot.data());
          }
        } catch (error) {
          console.error('Error loading product details:', error);
        }
      };

      getProductDetails();
    }, [productId]);

    return (
      <Modal
        open={!!productId}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {productData ? (
            <>
              <div style={descriptionBoxStyle}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                  {productData.name}
                </Typography>
                <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                  Price: ${productData.price}
                </Typography>
                <Typography variant="body1" component="div">
                  {productData.description}
                </Typography>
              </div>
              <div style={imageStyle}>
                <img
                  src={productData.image_url}
                  alt={productData.name}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </>
          ) : (
            <Typography variant="body1" component="div">
              Loading product details...
            </Typography>
          )}
        </Box>
      </Modal>
    );
  };

  export default ProductInfo;
