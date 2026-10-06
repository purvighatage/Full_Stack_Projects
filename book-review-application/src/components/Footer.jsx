import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';

// Color constants to match homepage
const primaryColor = '#0d47a1';
const secondaryColor = '#ff9800';
const accentColor = '#ffc107';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 5, md: 6 },
        px: 0,
        mt: 'auto',
        background: `linear-gradient(90deg, ${primaryColor} 80%, #1565c0 100%)`,
        color: '#fff',
        borderTopLeftRadius: { xs: 24, md: 32 },
        borderTopRightRadius: { xs: 24, md: 32 },
        boxShadow: '0 -6px 32px 0 rgba(13, 71, 161, 0.18)',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 6,
            mb: 2,
          }}
        >
          {/* Left: Navigation Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: accentColor, mb: 1 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <MuiLink
                component={Link}
                to="/about"
                color="inherit"
                underline="none"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  opacity: 0.92,
                  transition: 'color 0.2s',
                  '&:hover': { color: secondaryColor, textDecoration: 'underline' }
                }}
              >
                About Us
              </MuiLink>
              <MuiLink
                component={Link}
                to="/contact"
                color="inherit"
                underline="none"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  opacity: 0.92,
                  transition: 'color 0.2s',
                  '&:hover': { color: secondaryColor, textDecoration: 'underline' }
                }}
              >
                Contact
              </MuiLink>
              <MuiLink
                component={Link}
                to="/privacy"
                color="inherit"
                underline="none"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  opacity: 0.92,
                  transition: 'color 0.2s',
                  '&:hover': { color: secondaryColor, textDecoration: 'underline' }
                }}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink
                component={Link}
                to="/terms"
                color="inherit"
                underline="none"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  opacity: 0.92,
                  transition: 'color 0.2s',
                  '&:hover': { color: secondaryColor, textDecoration: 'underline' }
                }}
              >
                Terms & Conditions
              </MuiLink>
            </Stack>
          </Box>

          {/* Center: Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: accentColor, mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.92 }}>
              Email: <MuiLink href="mailto:support@bookrev.com" color="inherit" underline="hover" sx={{ color: secondaryColor }}>support@bookrev.com</MuiLink>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.92 }}>
              Phone: <MuiLink href="tel:+919876543210" color="inherit" underline="hover" sx={{ color: secondaryColor }}>+91 98765 43210</MuiLink>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.92 }}>
              Address: Pune, Maharashtra, India
            </Typography>
          </Box>

          {/* Right: Social Icons */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: accentColor, mb: 1 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton
                aria-label="Visit Facebook Page"
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '&:hover': { bgcolor: secondaryColor, color: '#fff', transform: 'scale(1.12)' },
                  transition: 'all 0.2s'
                }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                title="Facebook"
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Visit Twitter Page"
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '&:hover': { bgcolor: secondaryColor, color: '#fff', transform: 'scale(1.12)' },
                  transition: 'all 0.2s'
                }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                title="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton
                aria-label="Visit Instagram Page"
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '&:hover': { bgcolor: secondaryColor, color: '#fff', transform: 'scale(1.12)' },
                  transition: 'all 0.2s'
                }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                title="Instagram"
              >
                <Instagram />
              </IconButton>
              <IconButton
                aria-label="Visit LinkedIn Page"
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '&:hover': { bgcolor: secondaryColor, color: '#fff', transform: 'scale(1.12)' },
                  transition: 'all 0.2s'
                }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                title="LinkedIn"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Divider & Copyright */}
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, letterSpacing: 1 }}
        >
          © {new Date().getFullYear()} <span style={{ color: accentColor, fontWeight: 700 }}>BookRev</span>. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
