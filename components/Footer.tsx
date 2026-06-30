export default function Footer() {
  return (
    <footer className="bg-[#1c1f26] border-t border-[#2c3038] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-[#8b8f98]">
          © {new Date().getFullYear()} <span className="text-[#d97757] font-medium">ProductStore</span>. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}