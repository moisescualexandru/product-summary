import React, { Component } from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'

import AttachmentList from './AttachmentList'
import ImageLoader from './ImageLoader'
import ProductImage from './ProductImage'
import ProductSummaryBuyButton from './ProductSummaryBuyButton'
import ProductQuantityStepper from './ProductQuantityStepper'
import ProductSummaryPrice from './ProductSummaryPrice'
import ProductSummaryName from './ProductSummaryName'

import productSummary from '../productSummary.css'

class ProductSummaryInline extends Component {
  render() {
    const {
      product,
      showBorders,
      handleMouseEnter,
      handleMouseLeave,
      handleItemsStateUpdate,
      actionOnClick,
      imageProps,
      nameProps,
      priceProps,
      buyButtonProps,
    } = this.props

    const containerClasses = classNames(
      productSummary.container,
      productSummary.containerInlinePrice,
      'overflow-hidden br3 h-100 w-100'
    )

    const summaryClasses = classNames(
      `${productSummary.element} ${
        productSummary.clearLink
      } pointer ph2 pt3 pb4 flex flex-column`,
      {
        'bb b--muted-4 mh2 mh3-ns mt2': showBorders,
      }
    )

    const nameClasses = {
      containerClass: 'flex items-start justify-left tl w-90 t-mini pb2',
      brandNameClass: 't-body c-on-base',
    }

    const priceClasses = {
      containerClass: classNames('flex flex-column nr1', {
        [`${productSummary.priceContainer}`]: !showBorders,
      }),
      sellingPriceClass: 'dib ph2 t-body t-heading-5-ns',
    }

    const buyButtonClasses = {
      containerClass: `${productSummary.buyButtonContainer} pv3 w-100`,
    }

    return (
      <section
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          className={summaryClasses}
          page={'store.product'}
          params={{ slug: path(['linkText'], product) }}
          onClick={actionOnClick}
        >
          <article className="flex">
            <div className={`${productSummary.imageContainer} db w-30`}>
              {path(['sku', 'image', 'imageUrl'], product) ? (
                <ProductImage {...imageProps} />
              ) : (
                <ImageLoader />
              )}
            </div>
            <div className={`${productSummary.information} w-70 pb2 pl3 pr3`}>
              <ProductSummaryName {...nameProps} {...nameClasses} />
              <AttachmentList product={product} />
              <div className="nr2">
                <ProductSummaryPrice {...priceProps} {...priceClasses} />
              </div>
              <div className="flex">
                <ProductSummaryBuyButton
                  {...buyButtonProps}
                  {...buyButtonClasses}
                />
              </div>
            </div>
          </article>
        </Link>
      </section>
    )
  }
}

export default ProductSummaryInline
