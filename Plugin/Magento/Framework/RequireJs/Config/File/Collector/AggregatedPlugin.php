<?php
/**
 *
 */
namespace FishPig\LazyKnockoutJs\Plugin\Magento\Framework\RequireJs\Config\File\Collector;

use Magento\Framework\RequireJs\Config\File\Collector\Aggregated;
use Magento\Framework\View\Design\ThemeInterface;

class AggregatedPlugin
{
    /**
     *
     */
    public function aroundGetFiles(
        Aggregated $subject,
        \Closure $callback,
        ThemeInterface $theme,
        $filePath
    ): array {
        $files = $callback($theme, $filePath);
        $pathsToRemove = $this->getPathsToRemove();
        $pathsToTop = $this->getPathsForTop();
        $headItems = [];

        foreach ($files as $index => $file) {
            foreach ($pathsToRemove as $pathToRemove) {
                if (strpos($file->getFilename(), $pathToRemove) !== false) {
                    unset($files[$index]);
                    break;
                }
            }

            if (isset($files[$index])) {
                foreach ($pathsToTop as $pathToTop) {
                    if (strpos($file->getFilename(), $pathToTop)) {
                        unset($files[$index]);
                        $headItems[] = $file;
                        break;
                    }
                }
            }
        }

        if ($headItems) {
            $files = $headItems + $files;
        }

        return $files;
    }

    /**
     *
     */
    private function getPathsToRemove(): array
    {
        return [
            'vendor/magento/module-ui/view/frontend/requirejs-config.js',
            'Magento/Ui/view/frontend/requirejs-config.js'
        ];
    }

    /**
     *
     */
    private function getPathsForTop(): array
    {
        return [
            'app/code/FishPig/LazyKnockoutJs/view/frontend/requirejs-config.js',
            'vendor/fishpig/magento2-lazy-knockout-js/view/frontend/requirejs-config.js',
            'vendor/fishpig/magento2-lazyknockoutjs/view/frontend/requirejs-config.js',
        ];
    }
}
