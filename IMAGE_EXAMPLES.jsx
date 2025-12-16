// ============================================
// IMAGE IMPLEMENTATION EXAMPLES FOR JOB BOOK
// ============================================

// ============================================
// 1. SIMPLE IMAGE DISPLAY
// ============================================
import Box from '@mui/material/Box';

function SimpleImage() {
  return (
    <Box
      component="img"
      src="/images/hero.svg"
      alt="Hero illustration"
      sx={{
        maxWidth: '100%',
        height: 'auto',
        maxHeight: '300px'
      }}
    />
  );
}

// ============================================
// 2. IMAGE IN CARD
// ============================================
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function JobCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        image="/images/company-logo.png"
        alt="Company Logo"
        sx={{
          height: 200,
          objectFit: 'contain',
          backgroundColor: '#f5f5f5'
        }}
      />
      <CardContent>
        <Typography variant="h6">Company Name</Typography>
      </CardContent>
    </Card>
  );
}

// ============================================
// 3. BACKGROUND IMAGE
// ============================================
function HeroSection() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/hero.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h3" sx={{ color: 'white' }}>
        Welcome!
      </Typography>
    </Box>
  );
}

// ============================================
// 4. CIRCULAR AVATAR WITH IMAGE
// ============================================
import Avatar from '@mui/material/Avatar';

function UserAvatar() {
  return (
    <Avatar
      alt="User Name"
      src="/images/user-avatar.jpg"
      sx={{ width: 100, height: 100 }}
    />
  );
}

// ============================================
// 5. IMAGE WITH FALLBACK
// ============================================
function ImageWithFallback() {
  const [imageError, setImageError] = React.useState(false);

  return (
    <Box
      component="img"
      src={imageError ? '/images/fallback.svg' : '/images/main.png'}
      onError={() => setImageError(true)}
      alt="Image with fallback"
      sx={{ maxWidth: '100%' }}
    />
  );
}

// ============================================
// 6. RESPONSIVE IMAGE GALLERY
// ============================================
import Grid from '@mui/material/Grid';

function ImageGallery() {
  const images = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg'
  ];

  return (
    <Grid container spacing={2}>
      {images.map((img, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Box
            component="img"
            src={img}
            alt={`Image ${idx + 1}`}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

// ============================================
// 7. IMAGE UPLOAD WITH PREVIEW
// ============================================
function ImageUpload() {
  const [preview, setPreview] = React.useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: '16px' }}
      />
      {preview && (
        <Box
          component="img"
          src={preview}
          alt="Preview"
          sx={{
            maxWidth: '200px',
            height: 'auto',
            borderRadius: 2,
            border: '2px solid #ccc'
          }}
        />
      )}
    </Box>
  );
}

// ============================================
// 8. IMAGE WITH OVERLAY TEXT
// ============================================
function ImageWithOverlay() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="img"
        src="/images/background.jpg"
        alt="Background"
        sx={{
          width: '100%',
          height: 'auto'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
          Overlay Text
        </Typography>
      </Box>
    </Box>
  );
}

// ============================================
// 9. LAZY LOADED IMAGE
// ============================================
function LazyImage() {
  return (
    <Box
      component="img"
      src="/images/large-image.jpg"
      alt="Lazy loaded image"
      loading="lazy"
      sx={{ width: '100%', height: 'auto' }}
    />
  );
}

// ============================================
// 10. ANIMATED IMAGE
// ============================================
import { keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

function AnimatedImage() {
  return (
    <Box
      component="img"
      src="/images/icon.svg"
      alt="Animated icon"
      sx={{
        width: '100px',
        height: '100px',
        animation: `${bounce} 2s infinite`
      }}
    />
  );
}

// ============================================
// USAGE: FILE STRUCTURE
// ============================================
/*
public/
├── images/
│   ├── hero.svg
│   ├── interviews.svg
│   ├── progress.svg
│   ├── company-logos/
│   │   ├── google.png
│   │   ├── microsoft.png
│   │   └── amazon.png
│   ├── user-avatars/
│   │   └── default.png
│   └── backgrounds/
│       └── gradient.jpg
├── index.html
└── favicon.ico
*/

// ============================================
// NEXT STEPS
// ============================================
/*
1. Create public/images/ directory
2. Add your SVG/PNG/JPG files there
3. Use src="/images/filename.ext" in components
4. Rebuild: npm run build
5. Deploy with: npm run build && serve -s build

Example companies to add logos:
- Google
- Microsoft  
- Amazon
- Apple
- Meta
- Netflix
- Stripe
*/
