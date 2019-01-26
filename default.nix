 with (import <nixpkgs> {});
  with (import ./yarn2nix { inherit pkgs; });
  rec {
    kepler-gl = mkYarnPackage {
      name = "kepler-gl";
      src = ./.;
      packageJson = ./package.json;
      yarnLock = ./yarn.lock;
      yarnNix = ./yarn.nix;
    };
  }
