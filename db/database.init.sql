\c euniceem1007;
DROP DATABASE if exists express_gallery;
CREATE DATABASE express_gallery OWNER euniceem1007;

\c express_gallery;

-- DROP TABLE if exists photos;
-- CREATE TABLE photos (
--   id SERIAL PRIMARY KEY,
--   author VARCHAR(255),
--   link VARCHAR(500),
--   description VARCHAR(1000)
-- );

-- INSERT INTO photos (author, link, description) VALUES ('Roa', 
-- 'https://mymodernmet.com/wp/wp-content/uploads/2010/09/roa-street-art-prhbtn-festival.jpg', 
-- 'I think it’s fair to say that street artist Roa is on top of his game. What really separates him from the rest of the field is the way he adds different layers into a piece, giving his viewers multiples perspectives of the biology behind his animal subjects. It’s almost like we have x-ray vision.'),
-- ('Whils', 
-- 'https://mymodernmet.com/wp/wp-content/uploads/2010/09/vhils-alexandre-farto-azores-street-art.jpeg',
-- 'Portuguese-born Alexandre Farto aka Vhils is an amazing, super-talented street artist. Using tools like a power drill, chisel, and different types of paint, Vhils literally scratches off the surface of buildings to create his masterpieces.'),
-- ('Mademoiselle Maurice', 
-- 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FbjRBWNBnO-VMQX1MB6wLww%252FPageImage-525421-5169317-L1060531.jpg&width=1200&quality=80'
-- 'Known for a kind of multimedia, rainbow origami, Marie Saudin, aka Mademoiselle Maurice, cherishes the unrestricted context of working in public, a way to introduce art to people from any background. Born and raised in the mountains of Haute-Savoie, France, the artist studied architecture in Lyon before working in Geneva and Marseille. After spending time a tumultuous year in Japan—where she experienced 2011’s earthquake, tsunami, and the nuclear power plant explosion in Fukushima—Saudin’s origami work became inspired by Sadako Sasaki, a young girl who developed leukemia after exposure to Hiroshima’s nuclear radiation in 1945. As one version of the story goes, her classmates committed to fulfilling her mission of making 1,000 paper cranes, with which she was eventually buried.');


-- SELECT * FROM photos
