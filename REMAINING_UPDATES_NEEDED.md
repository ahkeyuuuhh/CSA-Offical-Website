# Remaining Updates Needed

## Completed ✅
1. Image preview modal size reduced to `max-w-3xl` and `max-h-[70vh]` for both products and portfolio
2. Enhanced AdminSidebar with:
   - Collapsible functionality (toggle button)
   - CSA logo from assets
   - Logout button at bottom
   - Smooth animations
   - Icon-only mode when collapsed

## Still Need to Implement

### 1. File Selector Instead of URL Input
**For Products Page** (`app/admin/products/page.tsx`):
- Replace Image URL text input with file selector
- Add file upload handling
- Show image preview when file is selected
- Store uploaded file path in database

**For Portfolio Page** (`app/admin/portfolio/page.tsx`):
- Same file selector implementation
- Same upload handling

**Implementation Notes**:
- Use `<input type="file" accept="image/*" />`
- Handle file selection and preview
- For now, store as `/assets/products-asset/filename.jpg` or `/assets/samples-asset/filename.jpg`
- In production, would upload to cloud storage (Supabase Storage, Cloudinary, etc.)

### 2. Category Dropdown Selection
**For Products Page**:
- Replace category text input with dropdown `<select>`
- Options: business, stickers, cards, accessories, specialty, custom

**For Portfolio Page**:
- Replace category text input with dropdown `<select>`
- Options: Print Materials, Custom Items, Specialty

### 3. Remove Featured from Portfolio
**For Portfolio Page**:
- Remove featured checkbox from Add/Edit forms
- Remove featured column from table
- Remove featured star icon display
- Update database to not use featured field for portfolio

**For Products Page**:
- Keep featured checkbox (products only)
- Keep featured column in table
- Keep featured star icon

## Code Snippets to Implement

### File Selector Component
```typescript
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // For now, set the path (in production, upload to storage first)
    const fileName = file.name;
    setFormData({ 
      ...formData, 
      image_url: `/assets/products-asset/${fileName}` 
    });
  }
};
```

### Category Dropdown
```tsx
<select
  value={formData.category}
  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
  required
  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
>
  <option value="">Select Category</option>
  <option value="business">Business</option>
  <option value="stickers">Stickers</option>
  <option value="cards">Cards</option>
  <option value="accessories">Accessories</option>
  <option value="specialty">Specialty</option>
  <option value="custom">Custom</option>
</select>
```

### File Input Field
```tsx
<div>
  <label className="text-white font-medium mb-2 block">Product Image *</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileSelect}
    required
    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600"
  />
  {imagePreviewUrl && (
    <div className="mt-3">
      <img src={imagePreviewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
    </div>
  )}
  <p className="text-gray-400 text-xs mt-1">
    Select an image file (JPG, PNG, WEBP)
  </p>
</div>
```

## Priority Order
1. Category dropdown (easiest)
2. Remove featured from portfolio
3. File selector implementation (most complex)

## Notes
- File upload in browser is for preview only
- Actual file needs to be manually placed in assets folder
- For production, integrate with Supabase Storage or similar
- Current implementation assumes files are already in assets folder
