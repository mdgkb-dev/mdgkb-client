import Cropper from '@/services/classes/Cropper';

class S {
  private cropper = new Cropper();
  private curGalleryCropIndex = 0;

  Open(cropper: Cropper) {
    this.cropper = cropper;
  }

  Cropper(): Cropper {
    return this.cropper;
  }

  Ratio(): number {
    return this.cropper.ratio;
  }
}

const store: S = new S();
export default store;
