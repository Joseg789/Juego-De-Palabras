type Props = {};

function Footer({}: Props) {
  return (
    <div className="text-center mt-6">
      <footer>
        <div className=" text-center py-4 mt-8 border-t border-slate-200 box-shadow-sm text-xl">
          <p>&copy; 2025 Juego De Palabras. By Jose Sanchez.</p>
          <a
            className=" hover:text-blue-500"
            href="https://github.com/joseg789"
          >
            GitHub
          </a>
          <span className="mx-2">|</span>
          <a
            className=" hover:text-blue-500"
            href="https://www.linkedin.com/in/jose-sanchez-8a11b0314/"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
