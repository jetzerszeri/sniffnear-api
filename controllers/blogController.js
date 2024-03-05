const Blog = require('../models/blogModel');

exports.crearBlog = async (req, res) => {
  try {
    const { blogType, type, title, content, owner, category, img, creator} = req.body;

    const blog = new Blog({
      blogType, 
      type, 
      title, 
      owner,
      content,
      category,
      img,
      creator
    });

    await blog.save();

    res.status(201).json({
      msg: 'Blog creado exitosamente',
      data: blog,
    });
  } catch (error) {
    console.error('Error al crear el blog:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Modificar una blog por su ID
exports.modificarBlog = async (req, res) => {
  try {
    const { title, description, category, img, status, content } = req.body;
    const blogId = req.params.id;

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, category, img, status, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ msg: 'Post no encontrado' });
    }

    res.json({
      msg: 'Post modificado exitosamente',
      data: blog,
    });
  } catch (error) {
    console.error('Error al modificar el post:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un blog por su ID
exports.eliminarBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findByIdAndRemove(blogId);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog no encontrado' });
    }

    res.json({ msg: 'Blog eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el blog:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Listar todas las blog
exports.listarBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('creator pet');

    res.json(blogs);
  } catch (error) {
    console.error('Error al listar los blogs:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Listar una blog por su ID
exports.obtenerBlogPorId = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId).populate('creator pet');

    if (!blog) {
      return res.status(404).json({ msg: 'Blog no encontrado' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error al obtener el blog por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
