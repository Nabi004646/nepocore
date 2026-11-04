"""Package a full editable project and the website's corresponding source download."""
from pathlib import Path
import shutil
import zipfile

root = Path(__file__).resolve().parents[1]
dist = root / "dist"
output = Path("/workspace/scratch/Nepocore_Static_Website.zip") if Path("/workspace/scratch").exists() else root / "Nepocore_Static_Website.zip"
for name in ["README.md", "LICENSE", "TOOLS.md", "ADSENSE_SETUP.md", "SECURITY.md", "CLOUDFLARE.md", "package.json", ".nvmrc", ".gitignore"]:
    shutil.copy(root / name, dist / name)
for file in dist.glob("qa-*.html"):
    file.unlink()

def add_project(archive, include_source_zip=False):
    for folder in ["dist", "src", "scripts", "tests"]:
        for file in sorted((root / folder).rglob("*")):
            if not file.is_file() or "__pycache__" in file.parts:
                continue
            if file == dist / "source.zip" and not include_source_zip:
                continue
            archive.write(file, file.relative_to(root))
    for name in ["README.md", "LICENSE", "TOOLS.md", "ADSENSE_SETUP.md", "SECURITY.md", "CLOUDFLARE.md", "package.json", ".nvmrc", ".gitignore"]:
        archive.write(root / name, name)

with zipfile.ZipFile(dist / "source.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    add_project(archive)
with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as archive:
    add_project(archive, include_source_zip=True)
print(f"Website package: {output} ({output.stat().st_size:,} bytes)")
