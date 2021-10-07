from rest_framework import serializers

from portfolio.models import Portfolio, PortfolioItem, SpecificationCard


class PortfolioItemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model=PortfolioItem
        fields='__all__'
        read_only_fields=['created_at', 'updated_at']
        extra_kwargs = {
            'portfolio': {'required': False},
        }

class SpecificationCardSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model=SpecificationCard
        fields='__all__'
        read_only_fields=['created_at', 'updated_at']
        extra_kwargs = {
            'portfolio': {'required': False},
            'image': {'required': False},
        }
        

class PortfolioSerializer(serializers.HyperlinkedModelSerializer):
    portfolio_items=PortfolioItemSerializer(many=True)
    specification_cards=SpecificationCardSerializer(many=True)

    class Meta:
        model=Portfolio
        fields='__all__'
        read_only_fields=['created_at', 'updated_at']

    def create(self, validated_data):
        portfolio_items_data=validated_data.pop('portfolio_items')
        specification_cards_data=validated_data.pop('specification_cards')

        portfolio=Portfolio.objects.create(**validated_data)

        for portfolio_item_data in portfolio_items_data:
            PortfolioItem.objects.create(portfolio=portfolio, **portfolio_item_data)
        for specification_card_data in specification_cards_data:
            SpecificationCard.objects.create(portfolio=portfolio, **specification_card_data)

        return portfolio

    def update(self, instance, validated_data):
        nested_fields=[
            {'field_name': 'portfolio_items', 'model':PortfolioItem}, 
            {'field_name': 'specification_cards', 'model': SpecificationCard}
            ]

        for nested_field in nested_fields:
            if nested_field['field_name'] in validated_data:
                nested_items_data=validated_data.pop(nested_field['field_name'])
                self.update_nested_field(nested_field['model'], nested_field['field_name'], instance, nested_items_data)

        return super(PortfolioSerializer, self).update(instance, validated_data)

    def update_nested_field(self, nested_field_model, field_name, instance, nested_items_data):
        for nested_item in getattr(instance, field_name).all():
            nested_item.delete()
        for nested_item_data in nested_items_data:
            nested_field_model.objects.create(portfolio=instance, **nested_item_data)
